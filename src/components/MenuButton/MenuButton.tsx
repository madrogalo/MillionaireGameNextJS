import Image from 'next/image';
import styles from './MenuButton.module.css';

type MenuButtonProps = {
  variant: 'menu' | 'close';
  onClick: () => void;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ variant, onClick }) => {
  const imageSrc = variant === 'menu' ? '/Menu.svg' : '/Close.svg';

  return (
    <button className={styles.menuButton} onClick={onClick}>
      <Image
        src={imageSrc}
        alt={`${variant} icon`}
        priority
        width={24}
        height={24}
      />
    </button>
  );
};
