<?php

/**
 * Connected Communities Initiative
 * Copyright (C) 2016  Queensland University of Technology
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * @link https://www.humhub.org/
 * @copyright Copyright (c) 2015 HumHub GmbH & Co. KG
 * @license https://www.humhub.org/licences GNU AGPL v3
 *
 */

class m160526_133040_create_save_step_evidence extends EDbMigration
{
	public function up()
	{
		$this->createTable('save_steps_evidence', array(
			'id' => 'pk',
			'name' => 'varchar(100) NOT NULL',
			'step1' => 'text NULL',
			'step2' => 'text NULL',
			'step3' => 'text NULL',
			'obj_step1' => 'text NULL',
			'obj_step2' => 'text NULL',
			'obj_step3' => 'text NULL',
			'created_at' => 'datetime NOT NULL',
			'created_by' => 'int(11) NOT NULL',
			'updated_at' => 'datetime NOT NULL',
			'updated_by' => 'int(11) NOT NULL',
		), '');

	}

	public function down()
	{
		$this->dropTable("save_steps_evidence");
	}
}
