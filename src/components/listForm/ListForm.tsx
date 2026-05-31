import { type SubmitEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import Input from '@/components/input/Input.tsx';
import Button from '@/components/button/Button.tsx';
import Checkbox from '@/components/checkbox/Checkbox.tsx';

import inputStyle from '@/components/input/Input.module.css';
import styles from './ListForm.module.css';
import { useListContext } from '@/hooks/useListContext.ts';
import type { List } from '@/types/types.ts';
import {
    checkItemToEditDuplicate,
    cleanUpString,
    convertStringToId,
    saveItemToLocalStorage,
} from '@/utils/helpers.ts';

interface ListFormProps {
    isUpdate?: boolean;
    editListId?: string;
    onClose?: () => void;
}

const ListForm = ({ isUpdate = false, editListId, onClose }: ListFormProps) => {
    const [isResetDate, setIsResetDate] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        lists,
        getList,
        error,
        setError,
        updateList,
        newList,
        setNewList,
        initialValues,
        handleInputChange,
    } = useListContext();

    const getListValues = (): List | undefined => {
        const titleValue = newList.title.trim();

        if (!titleValue) {
            setError(t('titleIsRequired', 'Title is required.'));
            return;
        }

        const id = convertStringToId(titleValue);
        const localStorageList = getList(id);
        const isTitleDuplicate = localStorageList?.id === id;

        if (isTitleDuplicate && !isUpdate) {
            setNewList(initialValues);
            setError(
                `"${newList.title}" ${t('isADuplicate.titleMustBeUnique', 'is a duplicate. Title must be unique.')}`
            );

            return;
        }

        const title = cleanUpString(titleValue);
        const dateCreated = isUpdate ? newList.dateCreated : new Date();

        const dateUpdated =
            isResetDate || !isUpdate ? new Date() : newList.dateUpdated;

        return {
            id,
            title,
            daysReset: newList.daysReset,
            dateCreated,
            dateUpdated,
        };
    };

    const handleCreateNewList = () => {
        const newList = getListValues();

        if (!newList) {
            return;
        }

        saveItemToLocalStorage<List>('lists', { ...newList });
        navigate(`/lists/${newList.id}`, { viewTransition: true });
    };

    const handleUpdateList = () => {
        const updatedList = getListValues();

        if (!updatedList) {
            return;
        }

        const isDuplicate = checkItemToEditDuplicate(
            lists,
            editListId!,
            updatedList.id
        );

        if (isDuplicate) {
            setNewList(initialValues);
            setError(
                `${updatedList.title} ${t('alreadyExists', 'already exists.')}`
            );
            return;
        }

        updateList(editListId!, { ...updatedList });

        onClose?.();
        setError(null);
        setIsResetDate(false);
    };

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        isUpdate ? handleUpdateList() : handleCreateNewList();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputsContainer}>
                <Input
                    autoFocus
                    id="title"
                    type="text"
                    label={t('title', 'Title')}
                    error={error}
                    value={newList.title}
                    onChange={handleInputChange}
                    placeholder={t('yourListTitle', 'Your list title')}
                />

                <div className={inputStyle.inputContainer}>
                    <label htmlFor="daysReset">
                        {t(
                            'chooseWhenToResetYourTasks',
                            'Choose when to reset your tasks'
                        )}
                    </label>

                    <select
                        id="daysReset"
                        name="daysReset"
                        value={newList.daysReset}
                        onChange={handleInputChange}
                        className={styles.selectInput}
                    >
                        <option value="">
                            -- {t('optional', 'Optional')} --
                        </option>
                        <option value="1">{t('everyDay', 'Every day')}</option>
                        <option value="7">
                            {t('every7Days', 'Every 7 days')}
                        </option>
                    </select>
                </div>

                {isUpdate && (
                    <Checkbox
                        name="isResetDate"
                        label={t(
                            'startResetCountdownFromToday',
                            'Start reset countdown from today'
                        )}
                        checked={isResetDate}
                        onChange={(e) => setIsResetDate(e.target.checked)}
                    />
                )}
            </div>

            <Button type="submit">
                {isUpdate ? t('edit', 'Edit') : t('create', 'Create')}
            </Button>
        </form>
    );
};

export default ListForm;
