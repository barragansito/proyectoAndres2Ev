export function Header({
  isUiSoundEnabled,
  onToggleUiSound,
  userDisplayName,
  isAdmin,
  onLogout,
}) {
  return (
    <header className="main-header">
      <h1>S.P.E.C.I.A.L. OPERATING SYSTEM</h1>
      <div className="header-right">
        <button type="button" className="sfx-toggle" onClick={onToggleUiSound}>
          SFX {isUiSoundEnabled ? 'ON' : 'OFF'}
        </button>
        <button type="button" className="sfx-toggle" onClick={onLogout}>
          LOGOUT
        </button>
        <div className="user-info">
          <span>
            V-TEC USER: {userDisplayName}
            {isAdmin ? ' [ADMIN]' : ''}
          </span>
          <span className="blink">_</span>
        </div>
      </div>
    </header>
  )
}
