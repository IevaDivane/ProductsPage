import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './App.module.scss';
import { Product } from './data/Data';
import check from './icons/check.png';
import star from './icons/star.png';
import logo from './icons/logo.png';
import timer from './icons/timer.png';
import trade from './icons/Icon.svg';
import visa from './icons/visa.svg';
import mastercard from './icons/mastercard.svg';
import applePay from './icons/apple_pay.svg';
import envelope from './icons/envelope.png';
import forward from './icons/forward.png';
import Rocker from './components/rocker/Rocker';

const App = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [products, setProducts] = useState<Product>();

  const getProducts = async () => {
    try {
      const response = await axios.get('https://fe-assignment.vaimo.net/'); //
      setProducts(response.data.product);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    }
  };

  // const starsField = (str:number) => {
  //   const starsArray = [];
  //   for (let i = 0; i < str; i + 1) {
  //     starsArray.push(i);
  //   } return starsArray;
  // };

  const options = (products) && Object.values(products.options);

  const optionsPrice = options?.map((d) => d.price.value);
  const optionsOldPrice = options?.map((d) => d.old_price.value);

  // @ts-ignore
  const lowestNew = optionsPrice?.sort((a:string, b:string) => a - b)[0].toFixed(2);
  // @ts-ignore
  const highestNew = optionsPrice?.sort((a:string, b:string) => a - b)[2];

  // @ts-ignore
  const lowestOld = optionsOldPrice?.sort((a:string, b:string) => a - b)[0];
  // @ts-ignore
  const highestOld = optionsOldPrice?.sort((a:string, b:string) => a - b)[2];

  const calculateTimeLeft = () => {
    // @ts-ignore
    const difference = products && new Date(products.discount.end_date).getTime() - new Date();

    let timeLeft = {};

    // @ts-ignore
    if (difference > 0) {
      // @ts-ignore
      timeLeft = {
        // @ts-ignore
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        // @ts-ignore
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        // @ts-ignore
        m: Math.floor((difference / 1000 / 60) % 60),
        // @ts-ignore
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerData = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timerData);
  });

  const timerComponents:any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    // @ts-ignore
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span className={style.timeLast}>
        {/* @ts-ignore */}
        {timeLeft[interval]}
        {interval}
        :
      </span>,
    );
  });

  // const inStock = products && products.props.fast_dispatch;

  const shippingCost = Number(products && products.shipping.method.cost.value);

  useEffect(() => {
    getProducts().then();
  }, []);

  return (
    <div>
      {products && !errorMessage && (
        <div className={style.app}>
          <div className={style.image}>
            <img src={products.gallery[0].main} alt="product" />
          </div>
          <div className={style.infoBox}>
            <div className={style.badges}>
              <button className={style.badgesBtn1}>
                Ready to Ship
              </button>
              {/* <button className={style.badgesBtn1}> */}
              {/*  Ready to Ship */}
              {/* </button> */}
              <button className={style.badgesBtn2}>
                <img src={check} alt="check" />
                In Stock
              </button>
              <button className={style.badgesBtn2}>
                <img src={check} alt="check" />
                Fast Dispatch
              </button>
            </div>
            <div>
              <div className={style.name}>
                <span className={style.nameSpan}>
                  {products.name}
                  {products.tags && (<span className={style.nameTag}>{products.tags}</span>)}
                </span>
              </div>
              <div className={style.ratingBox}>
                <div className={style.ratingBoxStars}>
                  {/* {starsField(Number(products.reviews.rating)).map((st:number) => ( */}
                  {/*  <div> */}
                  {/*    <img src={star} alt="star" /> */}
                  {/*  </div> */}
                  {/* ))} */}
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <img src={star} alt="star" />
                  <span className={style.ratingBoxRating}>{products.reviews.rating}</span>
                  <span className={style.ratingBoxCount}>
                    {products.reviews.count}
                    {' '}
                    Reviews
                  </span>
                </div>
                <span className={style.ratingBoxBuyers}>
                  {products.reviews.total_buyers}
                  {' '}
                  buyers
                </span>
              </div>
            </div>
            <div className={style.priceBox}>
              <div>
                <span>
                  {options && (
                  <div>
                    <div className={style.priceBoxFirstRow}>
                      <div className={style.priceBoxFirstRowPrice}>
                        <span>
                          {lowestNew}
                          {' '}
                          -
                          {' '}
                          {highestNew}
                        </span>
                      </div>
                      <div>
                        <span className={style.priceBoxFirstRowOptionOrder}>/ Option</span>
                        <span className={style.priceBoxFirstRowOptionLine}>|</span>
                        <span className={style.priceBoxFirstRowOptions}>2 Options</span>
                        <span className={style.priceBoxFirstRowOptionOrder}> (Min.Order)</span>
                      </div>
                    </div>
                    <div className={style.priceBoxSecondRow}>
                      <span>
                        {lowestOld}
                        -
                        {' '}
                        {highestOld}
                      </span>
                    </div>
                  </div>
                  )}
                </span>
              </div>
            </div>
            <div className={style.marchExpo}>
              <img src={logo} alt="logo" className={style.marchExpoImg} />
              <div className={style.marchExpoText}>
                <span>• Free shipping (up to $40)</span>
                <span className={style.marchExpoTextSecond}>• On-time delivery guaranteed</span>
                <img src={forward} alt="forward" />
              </div>
            </div>
            <div className={style.countdownTimer}>
              <div className={style.countdownTimerText}>
                <span className={style.countdownTimerDiscount}>
                  {products.discount.amount}
                  {' '}
                  {' '}
                  {' '}
                  {' '}
                  OFF
                </span>
                {' '}
                <span className={style.countdownTimerExplanation}>
                  Discount ends in
                </span>
              </div>
              <div className={style.countdownTimerTime}>
                <img src={timer} alt="timer" />
                <span>
                  {' '}
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  {timerComponents.length ? timerComponents : <span>Discount ended</span>}
                </span>
              </div>
            </div>
            <div className={style.products}>
              <div className={style.productsHeader}>
                <span>Options:</span>
              </div>
              {/* <Rocker options={options} /> */}
              <div className={style.productsList}>
                {options && Object.keys(options).map((o:any) => (
                  <div key={o} className={style.productsInfo}>
                    <div className={style.productsInfoLabelPrice}>
                      <span className={style.productsLabel}>
                        {options[o].label}
                      </span>
                      <span className={style.productsPrice}>
                        {options[o].price.currency.symbol}
                        {' '}
                        {options[o].price.value}
                      </span>
                    </div>
                    <Rocker />
                  </div>
                ))}
              </div>
            </div>
            <div className={style.tradeAssurance}>
              <img src={trade} alt="trade" />
              <div className={style.tradeAssuranceText}>
                <p className={style.tradeAssuranceBold}>Trade Assurance</p>
                <p className={style.tradeAssuranceSmall}> protects your Alibaba.com orders</p>
              </div>
            </div>
            <div className={style.payments}>
              <span className={style.paymentsText}>Payments:</span>
              <img src={visa} alt="visa" className={style.paymentsIcon} />
              <img src={mastercard} alt="master" className={style.paymentsIcon} />
              <img src={applePay} alt="applePay" className={style.paymentsIcon} />
            </div>
            <div className={style.links}>
              <span className={style.linkFirst}>Alibaba.com Logistics</span>
              <span className={style.linkSecond}>Inspection Solutions</span>
            </div>
          </div>
          <div className={style.addToBox}>
            <div className={style.addToBoxShippingCountry}>
              <span className={style.addToBoxShippingCountryText}>
                Ship to
                {' '}
                <span className={style.addToBoxShippingCountryTextUnderline}>
                  {products.shipping.method.country}
                  {' '}
                  by
                  {' '}
                  {products.shipping.method.title}
                </span>
              </span>
              <span className={style.addToBoxShippingCountryPrice}>
                {' '}
                {products.shipping.method.cost.currency.symbol}
                {' '}
                {shippingCost.toFixed(2)}
              </span>
            </div>
            <div className={style.addToBoxShippingLeadTime}>
              <div className={style.addToBoxShippingTextContainer}>
                {' '}
                <span>
                  Lead time
                  {' '}
                </span>
                <div className={style.tooltip}>
                  &#x1F6C8;
                  <span className={style.tooltipText}>lead time info</span>
                </div>
              </div>
              <div className={style.addToBoxShippingTextContainer}>
                <span>
                  Shipping time
                  {' '}
                  <span className={style.addToBoxShippingTextContainerBold}>
                    {' '}
                    {products.shipping.method.shipping_time.value}
                  </span>
                </span>
                <div className={style.tooltip}>
                  &#x1F6C8;
                  <span className={style.tooltipText}>{products.shipping.method.shipping_time.info}</span>
                </div>
              </div>
            </div>
            <div className={style.addToBoxButtons}>
              <button className={style.addToBoxButtonLogIn}>Login to Purchase</button>
              <button className={style.addToBoxButtonContact}>
                <img src={envelope} alt="mail icon" />
                Contact the Supplier
              </button>
            </div>
          </div>
        </div>
      )}
      {errorMessage && (
        <div>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
