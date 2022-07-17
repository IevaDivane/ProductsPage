import style from './Loader.module.scss';

const Loader = () => (
  <div className={style.loaderContainer}>
    <div className={style.loader} />
    <span className={style.loaderText}>please wait a moment</span>
  </div>
);

export default Loader;
