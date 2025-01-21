import './styles.css'

export const Input = (props) => {
    const { onChange, searchValue } = props;

    return (
        <input
            onChange={onChange}
            type='search'
            value={searchValue}
            className='input'
            placeholder='Type your search'
        />
    );
}