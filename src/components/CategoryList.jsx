const CategoryList = ({categories, onEditCategory, onDeleteCategory}) => {
    return (
        <div className="card p-4">
            <div className="flex items-center justify-center mb-4">
                <h4 className="text-lg font-semibold">
                    Category Sources
                </h4>

                {/*Category List*/}
                {categories.length === 0 ? (
                    <p className="text-gray-500">
                        No Categories added yet. Add some to get started!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sd:grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <div 
                            key={category.id}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">
                            {/* Category Icon */}

                            {/* Category Details */}
                            </div>
                        ))}
                    </div>
                ) }
            </div>

        </div>
    )
}

export default CategoryList;