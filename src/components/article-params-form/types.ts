import { ArticleStateType } from 'src/constants/articleProps';

export type ArticleParamsFormType = {
	title: string;
	pageStyles: ArticleStateType;
	setPageStyles: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};
