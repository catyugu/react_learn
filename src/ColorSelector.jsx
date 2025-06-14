
export default function ColorSelector({onColorSelect}) {
    const colors = ["Red", "Green", "Blue"];
    function handleColorSelect(color){
        return () => {
            onColorSelect(color);
        }
    }
    return (
        <div>
            {
                colors.map((color, index) => (
                    <button
                        key={index}
                        // style={{ backgroundColor: color.toLowerCase() }}
                        onClick={handleColorSelect(color.toLowerCase())}
                    >
                        {color}
                    </button>
                ))
            }
        </div>
    );
}