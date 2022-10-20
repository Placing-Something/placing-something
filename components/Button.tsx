import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>&{isLoading?: boolean, isLeft?: boolean}) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`
        ${props.isLoading && "animate-pulse bg-gray-200 hover:cursor-not-allowed text-transparent"} 
        ${props.isLeft ? "rounded-l-lg bg-blue-600" : "rounded-r-lg bg-red-500"}
        ${!props.isLoading && "hover:-translate-y-1 hover:shadow-md"}
        transition duration-100 font-medium text-lg h-20 w-1/2 m-0 text-white focus:outline-none
      `}
    />
  );
}
