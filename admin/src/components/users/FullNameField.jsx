import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
    marginTop: -theme.spacing(0.5),
    marginBottom: -theme.spacing(0.5),
  },
}));

const FullNameField = (props) => {
  const { record, size } = props;
  const classes = useStyles();
  return record ? (
    <div className={classes.root}>
      {record.username}
    </div>
  ) : null;
};

FullNameField.defaultProps = {
  source: 'username',
  label: 'Author',
};

export default FullNameField;
