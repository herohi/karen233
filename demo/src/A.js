import { useTheme } from './global'

function A() {
    const [theme, setTheme] = useTheme();

    return <>
        CompA: {theme}
        <button onClick={() => setTheme('themeA')}>change theme</button>
    </>
}

export default A;
