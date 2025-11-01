export default function Modal({ open, onClose, title, children, actions }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={title} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', zIndex: 50 }} onClick={onClose}>
      <div className="panel" style={{ width: 'min(520px, 92vw)', padding: 16 }} onClick={e => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        <div style={{ marginTop: 8 }}>{children}</div>
        {actions && <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>{actions}</div>}
      </div>
    </div>
  )
}


