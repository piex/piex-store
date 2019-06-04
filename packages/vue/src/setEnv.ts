import { Dispatch, SetStateAction } from 'vue-hooks';;

type useStateType<S> = (initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>]

export let useState: useStateType<any> = null as any;
export let useEffect = null as any;
export let useRef = null as any;

export default setInterval = ({
  useState: _useState,
  useEffect: _useEffect,
  useRef: _useRef,
}) => {

  useState = _useState;
  useEffect = _useEffect;
  useRef = _useRef;
};
