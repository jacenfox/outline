"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "data_attributes",
        {
          id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: "cascade",
            references: {
              model: "users",
            },
          },
          teamId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: "cascade",
            references: {
              model: "teams",
            }
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          dataType: {
            type: Sequelize.ENUM("string", "integer", "boolean", "list"),
            allowNull: false,
          },
          options: {
            type: Sequelize.JSONB,
            allowNull: true,
          },
          pinned: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          index: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
        { transaction }
      );

      await queryInterface.addIndex(
        "data_attributes",
        ["teamId"],
        { transaction }
      );

      await queryInterface.createTable(
        "document_data_attributes",
        {
          id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: "cascade",
            references: {
              model: "users",
            }
          },
          documentId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: "cascade",
            references: {
              model: "documents",
            }
          },
          dataAttributeId: {
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: "cascade",
            references: {
              model: "data_attributes",
            }
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        }, {
          transaction
        });

        await queryInterface.addIndex(
          "document_data_attributes",
          ["documentId"],
          { transaction }
        );
        await queryInterface.addIndex(
          "document_data_attributes",
          ["dataAttributeId"],
          { transaction }
        );
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("document_data_attributes", { transaction });
      await queryInterface.dropTable("data_attributes", { transaction });
    });
  }
};