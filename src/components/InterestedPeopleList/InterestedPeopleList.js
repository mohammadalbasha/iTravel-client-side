import classes from "./InterestedPeopleList.module.scss";

const InterestedPeopleList = (props) => {
  return (
    <div className={classes.interestedPeopleList}>
      <div className={classes.interestedPeopleList__header}>
        <h3 className={classes.interestedPeopleList__header__title}>
          List of Interested People in {props.title}
        </h3>
      </div>
      <ul className={classes.interestedPeopleList__list}>

        {props.users && props.users.map (user => {
          return (
            <li className={classes.interestedPeopleList__list__item}>
            <img
              src={user.imageUrl}
              alt="profile picture"
              className={classes["interestedPeopleList__list__item__user-image"]}
            />
  
            <div
              className={classes.interestedPeopleList__list__item__userDetails}
            >
              <div
                className={
                  classes.interestedPeopleList__list__item__userDetails__group
                }
              >
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__info
                  }
                >
                  Full Name:
                </span>
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__fullName
                  }
                >
                  {user.firstName} {user.lastName}
                </span>
              </div>
  
              <div
                className={
                  classes.interestedPeopleList__list__item__userDetails__group
                }
              >
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__info
                  }
                >
                  Email:
                </span>
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__username
                  }
                >
                  {user.email}
                </span>
              </div>
  
              <div
                className={
                  classes.interestedPeopleList__list__item__userDetails__group
                }
              >
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__info
                  }
                >
                  Phone Number:
                </span>
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__phoneNumber
                  }
                >
                  {user.phoneNumber}
                </span>
              </div>
              <div
                className={
                  classes.interestedPeopleList__list__item__userDetails__group
                }
              >
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__info
                  }
                >
                  Nationality:
                </span>
                <span
                  className={
                    classes.interestedPeopleList__list__item__userDetails__phoneNumber
                  }
                >
                  {user.nationality}
                </span>
              </div>
            </div>
          </li>
  
          )
        })}
      </ul>
    </div>
  );
};

export default InterestedPeopleList;
