import styles from "./RoleCard.module.css";

type RoleCardProps = {
  title: string;
  description: string;
  onSelect: () => void;
};

export function RoleCard({ title, description, onSelect }: RoleCardProps) {
  return (
    <button
      onClick={onSelect}
      className={styles.button}
    >
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <span className={styles.footer}>
          <>
            ВЫБРАТЬ
            <span className={styles.arrow}>→</span>
          </>
      </span>
    </button>
  );
}
