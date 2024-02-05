import React from 'react';
import { useParams } from "react-router-dom"

function OrdersDetail() {
    const { orderId } = useParams()
  return (
    <div>OrdersDetail</div>
  )
}

export default OrdersDetail