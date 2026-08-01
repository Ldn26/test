import React from 'react'
import MondialRelayVue from "../components/MondialRelayVue";

function Map() {
  return (
    <div>
      <MondialRelayVue onSelect={(data) => console.log(data)} />

    </div>
  )
}

export default Map