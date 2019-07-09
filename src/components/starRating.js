import React from "react"
import styled from "styled-components"

const FullStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const HalfStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <defs>
      <path id="a" d="M0 0h24v24H0V0z" />
    </defs>
    <path
      clipPath="url(#b)"
      d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
    />
  </svg>
)

const EmptyStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const StyledStarRating = styled.div`
  fill: #5c6bc0;
  display: flex;
  svg {
    flex: auto;
    height: auto;
  }
`

const StarRating = ({ rating, className }) => (
  <StyledStarRating className={className}>
    {getStarArray(rating)}
  </StyledStarRating>
)

export default StarRating

function getStarArray(rating) {
  const fullStars = Math.floor(rating / 2)
  const halfStars = rating % 2
  const arr = []

  let key = 0

  for (let i = 0; i < fullStars; i++) {
    arr.push(<FullStar key={key++} />)
  }

  for (let i = 0; i < halfStars; i++) {
    arr.push(<HalfStar key={key++} />)
  }

  for (let i = halfStars + fullStars; i < 5; i++) {
    arr.push(<EmptyStar key={key++} />)
  }

  return arr
}
