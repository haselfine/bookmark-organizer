module.exports = (sequelize, DataTypes) => { //books have a title, author, current page, total page count, priority, and are (in)complete
    let Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pageNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalPages: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookPriority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    Book.sync( {force: false} ).then( () => {
        console.log('Synced book table ')
    })

    return Book

}