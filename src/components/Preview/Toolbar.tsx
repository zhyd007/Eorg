import React from 'react'
import { baseUrl } from '../baseUrl'

type ToolbarPropsType = {
	login: boolean,
	store: {},
	disabled: boolean,
	onClick: () => void,
}

const Toolbar: React.FC<ToolbarPropsType> = (props) => {
	const {
		login, store, disabled, onClick,
	} = props

	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'auth' implicitly has an 'any' type.
	function download(auth, contentType, fileExtension): void {
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
						// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
						link.parentNode.removeChild(link)
					})
			})
	}

	function handleZipDownload(): void {
		download(store, 'application/zip', 'zip')
	}

	function handlePDFDownload(): void {
		download(store, 'application/pdf', 'pdf')
	}

	const preview = <button disabled={disabled} className="save" type="button" onClick={onClick}>preview</button>
	const downloadButtons = (
		<span style={{ position: 'absolute', margin: 0, left: '100px' }}>
			<i
				className="far fa-file-archive fa-2x"
				onClick={handleZipDownload}
				role="button"
				aria-label="archive-file"
				aria-hidden="true"
				aria-disabled={disabled}
				tabIndex={0}
			/>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<i
				className="far fa-file-pdf fa-2x"
				onClick={handlePDFDownload}
				role="button"
				aria-label="pdf"
				aria-hidden="true"
				aria-disabled={disabled}
				tabIndex={-1}
			/>
		</span>
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
