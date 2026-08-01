// MondialRelayVue.jsx
import { useEffect, useRef } from "react";
import Vue from "vue"; // Vue 2
import WidgetMondialRelay from "vue-widget-mondial-relay";
import "vue-widget-mondial-relay/dist/widget-mondial-relay.min.css";

export default function MondialRelayVue({ onSelect }) {
  const hostRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect; // évite de re-monter à chaque render

  useEffect(() => {
    // on monte Vue sur un noeud enfant, pas sur le div géré par React
    const mountPoint = document.createElement("div");
    hostRef.current.appendChild(mountPoint);

    const vm = new Vue({
      render: (h) =>
        h(WidgetMondialRelay, {
          props: {
            brand: "BDTEST  ",
            defaultPostCode: "59000",
            defaultCountry: "FR",
            maxResults: "7",
            deliveryMode: "24R",
          },
          on: {
            select: (data) => onSelectRef.current?.(data),
          },
        }),
    });
    vm.$mount(mountPoint);

    return () => vm.$destroy(); // nettoyage au démontage
  }, []);

  return <div ref={hostRef} />;
}