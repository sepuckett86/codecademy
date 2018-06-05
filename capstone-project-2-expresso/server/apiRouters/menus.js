const express = require('express');
const menusRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

menusRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Menu';
  db.all(sql, function(error, rows) {
    if (error) {
      res.status(404).send();
    } else {
      res.status(200).send({menus: rows});
    }
  })
})

menusRouter.get('/:id', (req, res, next) => {
  const sql = 'SELECT * FROM Menu WHERE id = $id'
  db.get(sql, {
    $id: req.params.id
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      res.status(200).send({menu: row});
    }
  })
});

menusRouter.post('/', (req, res, next) => {
  const sql = 'INSERT INTO Menu (title) VALUES ($title)';
  db.run(sql, {
    $title: req.body.menu.title
  }, function(error) {
    if (error) {
      res.status(400).send();
    } else {
      const sql2 = 'SELECT * FROM Menu WHERE Menu.id = $id';
      db.get(sql2, {
        $id: this.lastID
      }, function(error, row) {
        if (error || !row) {
          res.status(400).send();
        } else {
          res.status(201).send({menu: row});
        }
      })
    }
  })
})

menusRouter.put('/:id', (req, res, next) => {
  const sql = 'UPDATE Menu SET title = $title WHERE id = $id';
  if (!req.body.menu.title) {
    return res.status(400).send();
  } else {
    db.run(sql, {
      $title: req.body.menu.title,
      $id: req.params.id
    }, function(error) {
      if (error) {
        res.status(400).send();
      } else {
        const sql2 = 'SELECT * FROM Menu WHERE id = $id';
        db.get(sql2, {
          $id: req.params.id
        }, function(error, row) {
          if (error || !row) {
            res.status(400).send();
          } else {
            res.status(200).send({menu: row});
          }
        })
      }
    })
  }
})

menusRouter.delete('/:id', (req, res, next) => {
  // Check whether menu has corresponding menu items
  const sql = 'SELECT * FROM MenuItem WHERE menu_id = $id';
  db.get(sql, {
    $id: req.params.id
  }, function(error, row) {
    if (error) {
      res.status(404).send();
    } else if (!row) {
      // If no corresponding menu items, initiate delete
      const sql2 = 'DELETE FROM Menu WHERE id = $id';
      db.run(sql2, {
        $id: req.params.id
      }, function(error) {
        if (error) {
          res.status(400).send();
        } else {
          res.status(204).send();
        }
      })
    } else {
      res.status(400).send();
    }
  })
})

menusRouter.get('/:menuId/menu-items', (req, res, next) => {
  const sql = 'SELECT * FROM Menu WHERE id = $menuId';
  db.get(sql, {
    $menuId: req.params.menuId
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      const sql2 = 'SELECT * FROM MenuItem WHERE menu_id = $menuId';
      db.all(sql2, {
        $menuId: req.params.menuId
      }, function(error, rows) {
        if (error) {
          res.status(400).send();
        } else {
          res.status(200).send({menuItems: rows})
        }
      })
    }
  })
})

menusRouter.post('/:menuId/menu-items', (req, res, next) => {
  // First check for existence of menu
  const sql = 'SELECT * FROM Menu WHERE id = $menuId';
  db.get(sql, {
    $menuId: req.params.menuId
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      // Check for valid data
      if (!req.body.menuItem.name || !req.body.menuItem.description || !req.body.menuItem.inventory || !req.body.menuItem.price) {
        return res.status(400).send();
      } else {
        const sql2 = 'INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES ($name, $description, $inventory, $price, $menuId)';
        db.run(sql2, {
          $name: req.body.menuItem.name,
          $description: req.body.menuItem.description,
          $inventory: req.body.menuItem.inventory,
          $price: req.body.menuItem.price,
          $menuId: req.params.menuId
        }, function(error) {
          if (error) {
            res.status(400).send();
          } else {
            const sql3 = 'SELECT * FROM MenuItem WHERE id = $id';
            db.get(sql3, {
              $id: this.lastID
            }, function(error, row) {
              if (error) {
                res.status(400).send();
              } else {
                res.status(201).send({menuItem: row});
              }
            })
          }
        })
      }
    }
  })
})

menusRouter.put('/:menuId/menu-items/:menuItemId', (req, res, next) => {
  // First check for existence of menu
  const sql = 'SELECT * FROM Menu WHERE id = $menuId';
  db.get(sql, {
    $menuId: req.params.menuId
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      // Check for existence of menu-item
      const sqlItem = 'SELECT * FROM MenuItem WHERE id = $menuItemId';
      db.get(sqlItem, {
        $menuItemId: req.params.menuItemId
      }, function(error, row) {
        if (error || !row) {
          res.status(404).send();
        } else {
          // Check for valid data
          if (!req.body.menuItem.name || !req.body.menuItem.description || !req.body.menuItem.inventory || !req.body.menuItem.price) {
            return res.status(400).send();
          } else {
            const sql2 = 'UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, price = $price, menu_id = $menuId WHERE id = $menuItemId';
            db.run(sql2, {
              $name: req.body.menuItem.name,
              $description: req.body.menuItem.description,
              $inventory: req.body.menuItem.inventory,
              $price: req.body.menuItem.price,
              $menuItemId: req.params.menuItemId,
              $menuId: req.params.menuId
            }, function(error) {
              if (error) {
                console.log('error');
                res.status(400).send();
              } else {
                const sql3 = 'SELECT * FROM MenuItem WHERE id = $id';
                db.get(sql3, {
                  $id: req.params.menuItemId
                }, function(error, row) {
                  if (error) {

                    res.status(400).send();
                  } else {
                    res.status(200).send({menuItem: row});
                  }
                })
              }
            })
          }
        }
      })
    }
  })
})

menusRouter.delete('/:menuId/menu-items/:menuItemId', (req, res, next) => {
  // Check for existence of menu-item
  const sqlItem = 'SELECT * FROM MenuItem WHERE id = $menuItemId';
  db.get(sqlItem, {
    $menuItemId: req.params.menuItemId
  }, function(error, row) {
    if (error || !row) {
      res.status(404).send();
    } else {
      // Delete menu item
      const sqlDelete = 'DELETE FROM MenuItem WHERE id = $menuItemId';
      db.run(sqlDelete, {
        $menuItemId: req.params.menuItemId
      }, function(error) {
        if (error) {
          res.status(404).send();
        } else {
          res.status(204).send();
        }
      })
    }
  })
})

module.exports = menusRouter;
