import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  const spinnerClass = props.small ? classes['small-spinner'] : classes.spinner;

  return <div className={spinnerClass}></div>;
};

export default LoadingSpinner;
