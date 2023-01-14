import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const TestScreen = ({location}) => {
  const [email, setEmail] = useState(' ')
    const [password, setPassword] = useState(' ')

    let navigate = useNavigate()

    const redirect = ''

    const submitHandler = (e) => {
        e.preventDefault()
    }

  return (
    <div>TestScreen</div>
  )
}

export default TestScreen