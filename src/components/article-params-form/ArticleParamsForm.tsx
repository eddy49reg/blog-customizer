import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { ArticleParamsFormType } from './types';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useClickOutside } from 'src/hooks/useClickOutside';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	title,
	pageStyles,
	setPageStyles,
}: ArticleParamsFormType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [form, setForm] = useState<ArticleStateType>(pageStyles);

	useClickOutside(sidebarRef, () => setIsOpen(false));

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setPageStyles(form);
		setIsOpen(false);
	}

	function handleReset(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setForm(defaultArticleState);
	}

	function updateKeyValue(key: keyof ArticleStateType, option: OptionType) {
		setForm((prev) => ({ ...prev, [key]: option }));
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						{title}
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={form.fontFamilyOption}
						onChange={(selected) =>
							updateKeyValue('fontFamilyOption', selected)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						name={'fontSize'}
						selected={form.fontSizeOption}
						onChange={(selected) => updateKeyValue('fontSizeOption', selected)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={form.fontColor}
						onChange={(selected) => updateKeyValue('fontColor', selected)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={form.backgroundColor}
						onChange={(selected) => updateKeyValue('backgroundColor', selected)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={form.contentWidth}
						onChange={(selected) => updateKeyValue('contentWidth', selected)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
