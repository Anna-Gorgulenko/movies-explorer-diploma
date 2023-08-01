import React, { useState, useEffect } from "react"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import "./App.css"
import Header from "../Header/Header"
import Profile from "../Profile/Profile"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipUpdate from "../infoTooltipUpdate/infoTooltipUpdate"
import Register from "../Register/Register"
import Login from "../Login/Login"
import NotFound from "../NotFound/NotFound"
import * as api from "../../utils/MainApi"
import CurrentUserContext from "../../contexts/CurrentUserContext"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      api
        .fetchUserContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserProfile()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((err) => {
          console.log(err)
        })
      api
        .getMovies()
        .then((cardsData) => {
          console.log(cardsData)
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  // регистрация пользователя
  function handleRegistrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        handleAuthorizationUser({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
  }

  //логин пользователя
  function handleAuthorizationUser({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // редактирование данных пользователя
  function handleEditorUser(newUserInfo) {
    setIsLoading(true)
    api
      .modifyUserInfo(newUserInfo)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // лайк карточки фильма
  function handleCardLikeFilm(card) {
    api
      .createMovieOnServer(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
  }

  // удаление карточки с фильмом
  function handleCardDeleteFilm(card) {
    api
      .deleteMovieOnServer(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id)) // Удаляем карточку из списка избранных карточек
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorizedError(err)
      })
  }

  function handleUnauthorizedError(err) {
    if (err === "Error: 401") {
      handleSignOut()
    }
  }

  const handleSignOut = () => {
    setIsLoggedIn(false)
    // Удаляем токен из локального хранилища
    localStorage.removeItem("jwt")
    // Удаляем сохраненные фильмы из локального хранилища
    localStorage.removeItem("movies")
    localStorage.removeItem("movieSearch")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("allMovies")
    //localStorage.clear() очищает все данные в локальном хранилище
    localStorage.clear()
    // Перенаправляем пользователя на главную страницу
    navigate("/")
  }

  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  // Закрытие попапов по ESC
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  // Закрытие попапов
  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  // Закрытие попапов по оверлею
  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    isLoading={isLoading}
                    onAuthorization={handleAuthorizationUser}
                  />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    onRegister={handleRegistrationUser}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isLoggedIn}
                  component={Movies}
                  handleLikeFilm={handleCardLikeFilm}
                  ondeleteMovieOnServer={handleCardDeleteFilm}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  savedMovies={savedMovies}
                  loggedIn={isLoggedIn}
                  ondeleteMovieOnServer={handleCardDeleteFilm}
                  component={SavedMovies}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  isLoading={isLoading}
                  signOut={handleSignOut}
                  onUpdateUser={handleEditorUser}
                  loggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onCloseOverlay={closeByOverlay}
            onClose={closeAllPopups}
          />
          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            isUpdate={isUpdate}
            onCloseOverlay={closeByOverlay}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
