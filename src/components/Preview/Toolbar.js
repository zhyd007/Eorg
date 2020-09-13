import React from 'react'
import baseUrl from '../baseUrl/baseUrl'

const Toolbar = ({ login, store, disabled, onClick }) => {
	const download = (auth, contentType, fileExtension) => {
		const token = `Bearer ${auth.token}`
		fetch(`${baseUrl}draftJS/${fileExtension}`, {
			method: 'GET',
			headers: {
				'Content-Type': `${contentType}`,
				Authorization: token,
			},
		})
			.then((res) => {
				res.blob()
					.then((data) => {
						const fileURL = URL.createObjectURL(data)
						const link = document.createElement('a')
						link.href = fileURL
						link.setAttribute('download', `main.${fileExtension}`)
						// 3. Append to html page
						document.body.appendChild(link)
						// 4. Force download
						link.click()
						// 5. Clean up and remove the link
						link.parentNode.removeChild(link)
					})
			})
	}

	function handleLaTeXDownload() {
		download(store, 'application/x-tex', 'tex')
	}

	function handlePDFDownload() {
		download(store, 'application/pdf', 'pdf')
	}

	const preview = <button disabled={disabled} className="save" type="button" onClick={onClick}>preview</button>
	const downloadButtons = (
		<>
			<span>Download</span>
			&nbsp;&nbsp;
			<button disabled={disabled} type="button" onClick={handleLaTeXDownload}>
				LaTeX
			</button>
			&nbsp;&nbsp;
			<button disabled={disabled} type="button" onClick={handlePDFDownload}>
				PDF
			</button>
			&nbsp;&nbsp;
		</>
	)

	return (
		<div className="download">
			{preview}
			{
				!login ? null : downloadButtons
			}
		</div>
	)
}

export default Toolbar
