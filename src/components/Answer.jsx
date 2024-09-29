import Button from '@mui/material/Button';

const Answer = (props) => {
    return (
        <Button 
            sx={{ 
                borderColor: "#FFB549",
                color: "#FFB549",
                fontWeight: 600,
                marginBottom: "8px",
                "&:hover": {
                    backgroundColor: "#FFB549",
                    color: "#fff"
                }
            }}
            variant="outlined" 
            onClick={() => props.select(props.content, props.nextId)}
        >
            {props.content}
        </Button>
    )
}

export default Answer;
