import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../../../hocs/withAuth';
import userMenuNavItems from '../$configs/userMenuNavConfig';
import styles from '../AppHeader.module.css';

class DropDown extends PureComponent {
  handleSignOut = () => {
    const { onSignOut, history } = this.props;

    return onSignOut().then(() => history.push({ pathname: '/' }));
  };

  render() {
    return (
      <div className={styles.drop_down__container}>
        <ul className={styles.userMenu__list}>
          {userMenuNavItems.map(item => (
            <li key={item.name} className={styles.userMenu__item}>
              <Link to={item.path} className={styles.userMenu__link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={styles.signOutBtn}
          type="button"
          onClick={this.handleSignOut}
        />
      </div>
    );
  }
}

export default withAuth(DropDown);
