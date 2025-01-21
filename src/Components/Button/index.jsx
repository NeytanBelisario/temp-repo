import './styles.css'

export const Button = (props) => {
    const { text, onClick, disabled } = props
    console.log("text:"+text+"onClick:"+onClick)

    return(
        <button disabled={disabled}
        className='button' 
        onClick={onClick}
        >{text}</button>
    );
}