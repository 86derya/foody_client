import React from 'react';
import { NavLink } from 'react-router-dom';

import withAuth from '../../../hocs/withAuth';

import routes from '../../../../configs/routes';
import styles from '../AppHeader.module.css';

const userAuth = () => (
  <div className={styles.authLinks__wrap}>
    <NavLink
      to={routes.SIGN_UP}
      className={styles.authLinks__link}
      activeClassName={styles.authLinks__link_active}
    >
      Sign up
    </NavLink>
    <NavLink
      to={routes.SIGN_IN}
      className={styles.authLinks__link}
      activeClassName={styles.authLinks__link_active}
    >
      Log in
    </NavLink>
  </div>
);

export default withAuth(userAuth);
