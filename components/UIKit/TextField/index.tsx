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
	rightControlClassName?: string
	leftControlClassName?: string
	inputWrapperClassName?: string
	rightControl?: ReactNode
	leftControl?: ReactNode
	fieldClassName?: string
	label?: ReactNode
	onClickReset?(): void
	containerRef?: (v: HTMLDivElement) => void
} & Omit<JSX.IntrinsicElements['input'], 'ref'>

const TextField = ({
	children,
	error,
	label,
	rightControl,
	leftControl,
	containerClassName = '',
	containerRef,
	fieldClassName = '',
	inputWrapperClassName = '',
	rightControlClassName = '',
	leftControlClassName = '',
	onFocus,
	onBlur,
	...inputProps
}: Props) => {
	const [focused, setFocused] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const focusControlElement = (e: MouseEvent<HTMLElement>) => {
		if (focused) return
		e.preventDefault()
		e.stopPropagation()
		inputRef.current?.focus()
	}

	const _onFocus = (e: FocusEvent<HTMLInputElement>) => {
		setFocused(true)
		onFocus?.(e)
	}
	const _onBlur = (e: FocusEvent<HTMLInputElement>) => {
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
				<div
					onClick={focusControlElement}
					className={cx('LeftControl', leftControlClassName)}
				>
					{leftControl}
				</div>

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

					<input
						ref={inputRef}
						{...inputProps}
						onFocus={_onFocus}
						onBlur={_onBlur}
					/>
				</div>

				<div
					onClick={focusControlElement}
					className={cx('RightControl', rightControlClassName)}
				>
					{rightControl}
				</div>
			</div>
			{children}
			{error && <p className={cx('TextError')}>{error}</p>}
		</div>
	)
}

export default TextField
