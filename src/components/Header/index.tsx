import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M39.9902 0.270225L30.2035 36.8334C30.1537 36.9993 29.9546 37.0491 29.8385 36.9329L23.2864 30.3771L28.1963 12.0541C28.2461 11.8881 28.0968 11.7387 27.9309 11.7885L9.61809 16.7012L3.09911 10.1786C2.983 10.0624 3.03276 9.86327 3.19864 9.81348L39.7248 0.00467392C39.8907 -0.02852 40.04 0.120853 39.9902 0.270225Z"
          fill="#00B37E"
        />
        <path
          opacity="0.5"
          d="M23.2861 30.3768L20.7648 39.8371C20.715 40.0031 20.516 40.0529 20.3998 39.9367L0.0632817 19.6054C-0.0528324 19.4892 -0.00306943 19.2901 0.162808 19.2403L9.61781 16.7009L23.2861 30.3768Z"
          fill="#00B37E"
        />
        <path
          d="M28.1957 12.0538L23.2857 30.3768L9.61743 16.7009L27.9303 11.7882C28.0962 11.7384 28.2454 11.8878 28.1957 12.0538Z"
          fill="#00B37E"
        />
      </svg>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
