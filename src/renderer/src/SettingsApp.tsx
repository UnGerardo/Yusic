import BackgroundColorSetting from "./components/BackgroundColorSetting";

const SettingsApp = ({ display, closeHandler }: { display: string, closeHandler: () => void }): JSX.Element => {

  return (
    <div style={{ display: display, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3 }} >
      <h1>Settings</h1>
      <button onClick={closeHandler}>Close</button>
      <BackgroundColorSetting />
    </div>
  )
}

export default SettingsApp;