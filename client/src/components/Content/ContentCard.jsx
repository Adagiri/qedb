import { useEffect , useState} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import ContentModal from './ContentModal';

const styles = (theme) => ({
  root: {
    display: 'flex',
    marginBottom: '1rem',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },

  imageBox: {
    position: 'relative',
    width: '100px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
});

export default function ContentCard(props) {
  const { image, text, author, category } = props;

  const [question, setQuestion] = useState({});
  console.log(question)

  const useStyles = makeStyles(styles);
  const classes = useStyles(props);

    useEffect(() => {
      console.log('re rendered')
    }, [question]);

  const handleClick = () => {
    setQuestion(props);
  };

  const handleDoubleClick = () => {
    console.log('Clicked twice');
  };

  return (
    <>
      <Card
        className={classes.root}
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
      >
        <Box className={classes.contentBox}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography noWrap={true} component='p' variant='p'>
              {text}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mt: '10px',
                fontSize: '12px',
                verticalAlign: '',
              }}
            >
              <PersonIcon
                color='primary'
                fontSize='10px'
                sx={{ marginBottom: '2px' }}
              />
              <Link passHref href={`/profile/${author.id}`}>
                <MuiLink sx={{ cursor: 'pointer', ml: '5px' }} variant='body2'>
                  <span style={{ fontSize: '12px' }}>{author?.username}</span>
                </MuiLink>
              </Link>
            </Box>
          </CardContent>
        </Box>
        <Box className={classes.imageBox}>
          <Image
            src={image || 'https://qedb.s3.amazonaws.com/qedb-colored.svg'}
            alt={category[0]}
            layout='fill'
            objectFit="cover"
            objectPosition={'50% 50%'}
            // width={"80px"}
            // height={'20px'}
          />
        </Box>
      </Card>
      {<ContentModal question={question} setQuestion={setQuestion} />}
    </>
  );
}

/*
__Tasks
proper text limit in typography
resizing images
link to users profile when username is clicked
*/
