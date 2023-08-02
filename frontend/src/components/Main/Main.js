import React from "react"
import AboutMe from "../AboutMe/AboutMe"
import Promo from "../Promo/Promo"
import Techs from "../Techs/Techs"
import AboutProject from "../AboutProject/AboutProject"
import Portfolio from "../Portfolio/Portfolio"
import ScrollToTop from "../ScrollToTop/ScrollToTop"

// Компонент Main
function Main() {
  return (
    <main>
      <ScrollToTop />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main
