import styles from "./PrizeLadder.module.css";

type PrizeLadderProps = {
  prize: string;
  state?: "inactive" | "active" | "default";
};

export const PrizeLadder: React.FC<PrizeLadderProps> = ({
  prize,
  state = "default",
}) => {
  return (
    <div className={`${styles.prizeLadder} ${styles[state]}`}>
      <div className={`${styles.prize} ${styles[state]}`}>{prize}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="inherit"
        height="inherit"
        viewBox="0 0 240 32"
        fill="none"
      >
        <path
          d="M13.5303 3.70404C15.6719 1.64809 18.5256 0.5 21.4944 0.5H218.506C221.474 0.5 224.328 1.64809 226.47 3.70404L239.278 16L226.47 28.296C224.328 30.3519 221.474 31.5 218.506 31.5H21.4944C18.5256 31.5 15.6719 30.3519 13.5303 28.296L0.721988 16L13.5303 3.70404Z"
          fill="white"
          stroke="#D0D0D8"
          className={`${styles[state]}`}
        />
      </svg>
    </div>
  );
};
