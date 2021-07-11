import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	commentsOuterContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	commentsInnerContainer: {
		height: '200px',
		overflowY: 'auto',
		marginRight: '30px',
	},
	writeCommentArea: {
		width: '70%',
	},
}));

export default useStyles;
