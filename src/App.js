import { Switch, Route,  Redirect } from "react-router-dom";
//import {Routes, Navigate} from 'react-router-dom'

import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import AboutUsPage from "./pages/AboutUsPage";
import StartingPage from "./pages/StartingPage";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import CountriesPage from "./pages/CountriesPage";
import AttractionsPage from "./pages/AttractionsPage";
import StaysPage from "./pages/StaysPage";
import DashboardPage from "./pages/DashboardPage";
import Favorites from "./components/Favorites/Favorites";
import SelectCountryPage from "./pages/SelectCountryPage";
import TripsPage from "./pages/TripsPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import MyAccountPage from "./pages/MyAccountPage";
import RestaurantInfoPage from "./pages/RestaurantInfoPage";
import StayInfoPage from "./pages/StayInfoPage";
import StaysOptionsPage from "./pages/StaysOptionsPage";
import AddStayPage from "./pages/AddStayPage";
import InterestedPeopleListPage from "./pages/InterestedPeopleListPage";
import MyAccountHistoryPage from "./pages/MyAccountHistoryPage";
import TripsOptionsPage from "./pages/TripsOptionsPage";
import AddTripPage from "./pages/AddTripPage";
import TripInfoPage from "./pages/TripInfoPage";
import HotelsPage from "./pages/HotelsPage";
import AdvicesAndExperiencesPage from "./pages/AdvicesAndExperiencesPage";
import PartnersPage from "./pages/Partners";
import TourPlansPage from "./pages/TourPlans";
import SelectAttractionsCategoryPage from "./pages/SelectAttractionsCategoryPage";
import AttractionInfoPage from "./pages/AttractionInfoPage";
import TourPlansOptionsPage from "./pages/TourPlansOptionsPage";
import AddTourPlanPage from "./pages/AddTourPlanPage";
import TourPlanInfoPage from "./pages/TourPlanInfoPage";
import AdvicesAndExperiencesOptionsPage from "./pages/AdvicesAndExperiencesOptionsPage";
import AddAdviceAndExperiencePage from "./pages/AddAdviceAndExperiencePage";
import AddToTourPlanPage from "./pages/AddToTourPlanPage";

import AuthContext from "./store/auth-context";
import LocationContext from "./store/location-context";

function App() {
  const authCtx = useContext(AuthContext);
   const locationCtx = useContext(LocationContext);
    console.log(locationCtx.lonlat);
    console.log(locationCtx.csc);
  return (
    // <Routes> in react router 6
   <Switch>
    {!authCtx.isLoggedIn && (
        <Route path="/" exact>
          <StartingPage />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Route path="/" exact>
          {/* <Navigate replace to="/main" />  react router 6 */}
          <Redirect to='/main' />

        </Route>
      )}

      {!authCtx.isLoggedIn && (
        <Route path="/login">
          <LogInPage />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Route path="/login">
          {/* <Navigate replace to="/main" />  uin react router 6*/}
          <Redirect to='/main' />

        </Route>
      )}

      {!authCtx.isLoggedIn && (
        <Route path="/signup">
          <SignUpPage />
        </Route>
      )}

      {authCtx.isLoggedIn && (
        <Route path="/signup">
          {/* <Navigate replace to="/main" />  in react router 6*/ } 
          <Redirect to='/main' />
        </Route>
      )}

      {!authCtx.isLoggedIn && (
        <Route path="/select-country">
          <SelectCountryPage />
        </Route>
      )}

      <Layout>
        <Route path="/select-country">
          {authCtx.isLoggedIn && <SelectCountryPage />}
        </Route>

        <Route path="/restaurant-info">
          {authCtx.isLoggedIn && <RestaurantInfoPage/>}
          {!authCtx.isLoggedIn &&           <Redirect to="/login" />
                    // <Navigate replace to="/login" /> in react router 6

}
        </Route>

        <Route path="/dashboard">
          {authCtx.isLoggedIn && <DashboardPage />}
          {!authCtx.isLoggedIn &&          <Redirect to="/login" /> 
          // <Navigate replace to="/login" /> in react router 6
}
        </Route>

        <Route path="/main">
          {authCtx.isLoggedIn && <HomePage />}
          {!authCtx.isLoggedIn &&           <Redirect to="/login" />
}
        </Route>

        <Route path="/interested-people-list">
          {authCtx.isLoggedIn && <InterestedPeopleListPage />}
          {!authCtx.isLoggedIn &&          <Redirect to="/login" />
}
        </Route>

        <Route path="/select-trip-option">
          {authCtx.isLoggedIn && <TripsOptionsPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/add-trip">
          {authCtx.isLoggedIn && <AddTripPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/trips">
          {authCtx.isLoggedIn && <TripsPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/trip-info/:tripId">
          {authCtx.isLoggedIn && <TripInfoPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/select-stay-option">
          {authCtx.isLoggedIn && <StaysOptionsPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/stays">
          {authCtx.isLoggedIn && <StaysPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/add-stay">
          {authCtx.isLoggedIn && <AddStayPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/stay-info/:stayId">
          {authCtx.isLoggedIn && <StayInfoPage/>}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/restaurants">
          {authCtx.isLoggedIn && <RestaurantsPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/hotels">
          {authCtx.isLoggedIn && <HotelsPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
 
        <Route path="/select-attractions-category">
          {authCtx.isLoggedIn && <SelectAttractionsCategoryPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/attractions/:category">
          {authCtx.isLoggedIn && <AttractionsPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/attraction-info">
          {authCtx.isLoggedIn && <AttractionInfoPage />}
          {!authCtx.isLoggedIn &&  <Redirect to="/login" />}
        </Route>

        <Route path="/countries">
          {authCtx.isLoggedIn && <CountriesPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/select-tour-plan-option">
          {authCtx.isLoggedIn && <TourPlansOptionsPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/add-tour-plan">
          {authCtx.isLoggedIn && <AddTourPlanPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/add-to-tour-plan">
          {authCtx.isLoggedIn && <AddToTourPlanPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/tour-plans">
          {authCtx.isLoggedIn && <TourPlansPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/tour-plan-info/:planId">
          {authCtx.isLoggedIn && <TourPlanInfoPage/>}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/select-partner-option">
          {authCtx.isLoggedIn && <PartnersPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/select-advice-and-experience-option">
          {authCtx.isLoggedIn && <AdvicesAndExperiencesOptionsPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/add-advice-and-experience">
          {authCtx.isLoggedIn && <AddAdviceAndExperiencePage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/advices-and-experiences">
          {authCtx.isLoggedIn && <AdvicesAndExperiencesPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>


        <Route path="/favorites">
          {authCtx.isLoggedIn && <Favorites />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/my-account">
          {authCtx.isLoggedIn && <MyAccountPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/my-account-history">
          {authCtx.isLoggedIn && <MyAccountHistoryPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/contactus">
          {authCtx.isLoggedIn && <ContactUsPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/aboutus">
          {authCtx.isLoggedIn && <AboutUsPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Layout>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    /</Switch>
    // </Routes>
  );
}

export default App;

/*

{authCtx.isLoggedIn && <HowItWorksPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
          */
