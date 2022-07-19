import React, {
	memo,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from 'react'
import styles from './index.module.scss'
import classNames from 'classnames/bind'
import { createPortal } from 'react-dom'
import { useOverflowController, useOverlayClickHandler } from 'helpers'
const cx = classNames.bind(styles)

export type SidebarProps = PropsWithChildren<{
	close(): void
	isOpen: boolean
	className?: string
	wrapperClassName?: string
	sidebarRef?: React.RefObject<HTMLDivElement>
	position?: 'top' | 'bottom' | 'left' | 'right'
}>

const Sidebar = memo(
	({
		isOpen,
		close,
		children,
		className = '',
		wrapperClassName = '',
		position = 'left',
		sidebarRef,
	}: SidebarProps) => {
		const overflowController = useOverflowController()
		const isFirstRenderRef = useRef(true)
		const ref = useRef<HTMLDivElement>(null)
		if (sidebarRef) (sidebarRef as any).current = ref.current
		const portalRef = useRef<HTMLDivElement>(null)
		const portal = portalRef.current
		const [isVisible, setIsVisible] = useState(false)

		const hidden = !isOpen && !isVisible
		const shown = isOpen && isVisible

		useEffect(() => {
			portalRef.current = document.createElement('div')
		}, [])

		useEffect(() => () => portal && portal.remove(), [])

		const hide = () => {
			if (isOpen) setIsVisible(false)

			setTimeout(() => {
				if (!isOpen) setIsVisible(false)
				close()
				overflowController.unblockScroll()
				portal && portal.remove()
			}, 200)
		}

		const overlayClickHandler = useOverlayClickHandler(hide)

		useEffect(() => {
			if (isOpen) {
				portal && document.body.appendChild(portal)
				setTimeout(() => {
					setIsVisible(true)
					overflowController.blockScroll(ref.current!)
				})
			} else {
				if (isFirstRenderRef.current) {
					isFirstRenderRef.current = false
				} else {
					hide()
				}
			}
		}, [isOpen])

		if (hidden) return null

		return createPortal(
			<div
				ref={ref}
				{...overlayClickHandler.overlayProps}
				className={cx('Wrapper', wrapperClassName, shown && 'isOpen', position)}
			>
				<aside
					{...overlayClickHandler.componentProps}
					className={cx('Component', className)}
				>
					{children}
				</aside>
			</div>,
			portal
		)
	}
)

export default Sidebar
