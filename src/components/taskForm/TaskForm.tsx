import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';

import styles from '@/components/listForm/ListForm.module.css';

const TaskForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.inputsContainer}>
                <Input
                    type="text"
                    error={null}
                    id="description"
                    label="Description"
                />

                <Input
                    type="number"
                    id="quantity"
                    error={null}
                    label="Quantity"
                />
            </div>

            <Button type="submit">Create</Button>
        </form>
    );
};

export default TaskForm;
