// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts'). 
declare module '*.scss';

// We need to tell import icon
declare module '*.png' {
	const value: any;
	export = value;
  }