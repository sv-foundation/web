import classNames from 'classnames/bind'
import React, {
	FocusEvent,
	MouseEvent,
	ReactNode,
	useRef,
	useState,
} from 'react'
import styles from './index.module.scss'
const cx = classNames.bind(styles)

export type Props = {
	error?: ReactNode
	containerClassName?: string
	inputWrapperClassName?: string
	fieldClassName?: string
	label?: ReactNode
	onClickReset?(): void
	containerRef?: (v: HTMLDivElement) => void
} & Omit<JSX.IntrinsicElements['textarea'], 'ref'>

const TextareaField = ({
	children,
	error,
	label,
	containerClassName = '',
	containerRef,
	fieldClassName = '',
	inputWrapperClassName = '',
	onFocus,
	onBlur,
	...inputProps
}: Props) => {
	const [focused, setFocused] = useState(false)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const focusControlElement = (e: MouseEvent<HTMLElement>) => {
		if (focused) return
		e.preventDefault()
		e.stopPropagation()
		inputRef.current?.focus()
	}

	const _onFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
		setFocused(true)
		onFocus?.(e)
	}
	const _onBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
		setFocused(false)
		onBlur?.(e)
	}

	return (
		<div ref={containerRef} className={cx('Component', containerClassName)}>
			<div
				onMouseDown={focusControlElement}
				className={cx(
					'Field',
					focused && 'focused',
					inputProps.value && 'filled',
					error && 'error',
					fieldClassName,
					!label && 'no-label',
					inputProps.disabled && 'disabled'
				)}
			>
				<div className={cx('InputWrapper', inputWrapperClassName)}>
					{label && (
						<label
							onClick={focusControlElement}
							className={cx('Label')}
							htmlFor=''
						>
							{label}
						</label>
					)}

					<textarea
						ref={inputRef}
						{...inputProps}
						onFocus={_onFocus}
						onBlur={_onBlur}
					/>
				</div>
			</div>
			{children}
			{error && <p className={cx('TextError')}>{error}</p>}
		</div>
	)
}

export default TextareaField
