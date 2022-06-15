import { useTheme } from './global'

function B() {
    const [theme, setTheme] = useTheme();

    return <>
        CompB: {theme}
        <button onClick={() => setTheme('themeB')}>change theme</button>
    </>
}

export default B;
