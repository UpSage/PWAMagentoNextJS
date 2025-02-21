import { Category } from "../interface/category";

type TitleProps = {
 category: Category;
};

const Title = ({ category }: TitleProps) => (
 <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
);

export default Title;