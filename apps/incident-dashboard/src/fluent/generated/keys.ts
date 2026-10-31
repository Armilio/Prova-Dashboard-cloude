import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '4044e1e0fdd54168a5423dee926b2e93'
                    }
                    'incident-monitoring-dashboard': {
                        table: 'par_dashboard'
                        id: 'ed7bcc0471f542d8a67edab59d656db6'
                    }
                    'incident-resume-on-hold': {
                        table: 'sys_script'
                        id: '2541a160f08f487d835db6f9ea4428db'
                        deleted: true
                    }
                    'incmon-backlog-aging': {
                        table: 'par_dashboard_widget'
                        id: '15cdecd36e264e4fb9893a073e3d4cfc'
                    }
                    'incmon-backlog-by-group': {
                        table: 'par_dashboard_widget'
                        id: 'dca4fcecd13d45c299ad39b4da69e3eb'
                    }
                    'incmon-backlog-by-priority': {
                        table: 'par_dashboard_widget'
                        id: 'dcec5140d9ec4ab2be20816a74f5fdd4'
                    }
                    'incmon-by-channel': {
                        table: 'par_dashboard_widget'
                        id: 'db189e90109748458a66731577e61ed9'
                    }
                    'incmon-header-filters': {
                        table: 'par_dashboard_widget'
                        id: 'b19046b1b90647808c4b14054ec674db'
                    }
                    'incmon-kpi-backlog': {
                        table: 'par_dashboard_widget'
                        id: '9b18b5b6316348379fa80a8c470db71a'
                    }
                    'incmon-kpi-backlog-p1': {
                        table: 'par_dashboard_widget'
                        id: 'ac17a5a530524b7e86f04694761cf40c'
                    }
                    'incmon-kpi-closed-30d': {
                        table: 'par_dashboard_widget'
                        id: 'fda5388e5b3a4c7792ef5aa1fa28c892'
                    }
                    'incmon-kpi-older-30d': {
                        table: 'par_dashboard_widget'
                        id: 'bae2a88ba1ac477b8d98f7fa03c33069'
                    }
                    'incmon-kpi-opened-30d': {
                        table: 'par_dashboard_widget'
                        id: 'ec1d3d64a4a94bb3bc736f92e5d7ce37'
                    }
                    'incmon-kpi-p1-30d': {
                        table: 'par_dashboard_widget'
                        id: '10171be94b164d5e815fc2b0143936fb'
                    }
                    'incmon-kpi-unassigned': {
                        table: 'par_dashboard_widget'
                        id: '481e780c5a754449b38e7c624f9270a5'
                    }
                    'incmon-on-hold-reason': {
                        table: 'par_dashboard_widget'
                        id: 'c10934e340394e499f2fb9c928e4aba9'
                    }
                    'incmon-open-heatmap': {
                        table: 'par_dashboard_widget'
                        id: '240ed467c12944388b7fd8f734d520b3'
                    }
                    'incmon-opened-vs-closed': {
                        table: 'par_dashboard_widget'
                        id: '5d65579f920c4c4a965638f79862b23c'
                    }
                    'incmon-priority-trend': {
                        table: 'par_dashboard_widget'
                        id: 'fec5eacfe6094c0087076ab699a36761'
                    }
                    'incmon-tab-backlog': {
                        table: 'par_dashboard_tab'
                        id: 'baca6932ef93488d8d7e2622b3cd3741'
                    }
                    'incmon-tab-volumes': {
                        table: 'par_dashboard_tab'
                        id: '04c2c7fba8a8463dbab7c683d5d2f3b2'
                    }
                    'incmon-top-category': {
                        table: 'par_dashboard_widget'
                        id: '44d4f756ac5b4db1930a130dc2545335'
                    }
                    'incmon-top-ci': {
                        table: 'par_dashboard_widget'
                        id: 'daf6b0a4ad4f4aed866a036f24a4a679'
                    }
                    'open-slot-timezone': {
                        table: 'sys_properties'
                        id: 'e759f1d4ce284c678a5e3b2f5c98842d'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '767a539a8a2242da95832acf8b8aaeb4'
                    }
                    'set-incident-open-slot': {
                        table: 'sys_script'
                        id: '82b8889599a644f38a4209447f612553'
                    }
                    'src_server_business-rules_resume-on-hold_ts': {
                        table: 'sys_module'
                        id: 'bed04dc6fcb64eceb58ca297bb93cbb9'
                        deleted: true
                    }
                    'src_server_business-rules_set-open-slot_ts': {
                        table: 'sys_module'
                        id: '3b1bbb6081954d9a870e1a620b51ece1'
                    }
                }
                composite: [
                    {
                        table: 'sys_choice'
                        id: '02aae493d9354e42810d41c1aafc499d'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            value: '4'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0418cf3c5e29487283bf6bf14c36f30b'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'short_description'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '08607461e1d5440e89176950546ca462'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '00'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '12a265fddac948e8bfa896821a795d0c'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            value: '2'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '139a7f74a36a40579f2639bb19f602d6'
                        key: {
                            name: 'incident'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '179588d20d614da8881bdf4123cb60bf'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '23'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1a85285d0dfe449eb43b217c8fa10f62'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '06'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1eb6a64c63df41838be8d09d152c9f67'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '11'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '1f89f8026e984f4881f930be5da7346d'
                        key: {
                            sys_ui_form: {
                                id: 'a808cdd6a6bf4092a1bae7809f1d5c2a'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '43f0bb1901804d8f9434cba4df04defa'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Attività'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2397192e8a6947fb98e133ecc0ad8502'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'pluto'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '259e6d030f804385bcbd587850771381'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            element: 'pluto'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2d0ec8ed52ad439297517b634304673a'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '15'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3438e523f1164f7fa618675b9152ed65'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '35ab9862192746e98362de4920de98bd'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '16'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3c8aa9e3df5e48759f7ae9fd841557f9'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3ef43f1d6dc743839210ff52a5ea37e1'
                        key: {
                            sys_ui_section: {
                                id: '43f0bb1901804d8f9434cba4df04defa'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Attività'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity.xml'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '437349aa4a7d41f0a92d9e6b6730e96e'
                        key: {
                            sys_ui_form: {
                                id: 'a808cdd6a6bf4092a1bae7809f1d5c2a'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '43f0bb1901804d8f9434cba4df04defa'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            caption: 'Attività'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '443c0efb86cd4c6f93642b35ec3ed86a'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '13'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '54f8f8ebd0a44190bfd4b10b6ca925c4'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '09'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '55ea548c1dfa43d28f873e92a4c7a11d'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            caption: 'Client Case'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '56cba89c0fec486d930cb0c153e75a3d'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5a5217d305da449ca96c229a2a92a8a6'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            value: '7'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5ac9ef33391249e2a4be4e67825818eb'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '02'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5fcbfe746aa74441ac3665c38429ff54'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'assigned_to'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '715e4b0070f74eafb4a2b3cb9bef94e7'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '18'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72eb5588e22c45a0a5761bcecbd03a48'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '75215050bb1c45a790da52e56a86e3c2'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '17'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7639dc435756472dbf0d8f43ab2fcc8a'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7aa6d4c3c5294e7b9ee700e542c950c9'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'opened_at'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8059d08490c947aaaa6a5dbd0456456e'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '81b755c6f3394242a684bb0b5669a263'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '82bce4ac728640759af0370207a268de'
                        key: {
                            name: 'x_507217_incdash_client_case'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '852bc6e7edc042209b11106a35a0df75'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'priority'
                            position: '3'
                        }
                    },
                    {
                        table: 'par_dashboard_canvas'
                        id: '8b166a6605f3487c848be9a73d40926d'
                        key: {
                            dashboard: 'ed7bcc0471f542d8a67edab59d656db6'
                            dashboard_tab: '04c2c7fba8a8463dbab7c683d5d2f3b2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e87f9c118014a148e6c89eb40f6450a'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '21'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8fcea20ffc8945db9f815d72d03ae73f'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            value: '3'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '90330384e3014edca44c93bca64e8512'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            element: 'pippo'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '90ce3408d2f0425bb5538bb3196d20f1'
                        key: {
                            sys_ui_section: {
                                id: '43f0bb1901804d8f9434cba4df04defa'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Attività'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'comments'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9623d92fb69f41928fc1efcfc105b5b2'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            value: '5'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'par_dashboard_canvas'
                        id: '96c88b54aa4c44059832a375466c7f2d'
                        key: {
                            dashboard: 'ed7bcc0471f542d8a67edab59d656db6'
                            dashboard_tab: 'baca6932ef93488d8d7e2622b3cd3741'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9982f0087638457e98a2c5c22453689c'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9b62af4164984b0389f56745cdad3589'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'assignment_group'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9ca8427859354853923e4e51ceb2dbed'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            value: '1'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9dde6dca823c46c387758a2c10f33a44'
                        key: {
                            sys_ui_section: {
                                id: '43f0bb1901804d8f9434cba4df04defa'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Attività'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f3fe698300345a49affa2d05d247c48'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            element: 'pluto'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a439f020ac1342419598facdac013d3f'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '20'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'a808cdd6a6bf4092a1bae7809f1d5c2a'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ac0d78bdcb6d4fdbac4bcaabd8b36139'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aea1e5b2e16c419aa28b629ec7edb102'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '12'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8eb7eca520c41be95f3a04fcd76b9b1'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '07'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c1ee7956b3114dbc8127a62374fe2564'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                            value: '6'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c38d8ea1e2a54cf181d0662697aa1082'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '10'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c6c787f933604d69bf62270c8687d3fa'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '04'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c821068d1202435b81dbc697244c28da'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '14'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb6af358dfc34ef1a729a9d885fb4956'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cc0cfd0a62804c6c9dc237d54c30bf35'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '08'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'par_dashboard_visibility'
                        id: 'cdb3d1e3009c4a90b4af51112caf59cd'
                        key: {
                            dashboard: 'ed7bcc0471f542d8a67edab59d656db6'
                            experience: '08c73d60537101100834ddeeff7b1287'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cf8718d0263d45f3b2f6830d7d581bcc'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'pippo'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd47435063666415a8a32d1d3046520ba'
                        key: {
                            name: 'incident'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd4c9aa0252234fe291c6c8afaf7f5ed9'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '05'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4e6b16c567149a195e09b7568ed992c'
                        key: {
                            name: 'incident'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'par_dashboard_canvas'
                        id: 'd54bcc6868824fb7b8fb49f6a68633af'
                        key: {
                            dashboard: 'ed7bcc0471f542d8a67edab59d656db6'
                            dashboard_tab: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd8244a975af94cba9ced428feb3313b8'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '01'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'db6f3303b93a430bb923c7ecd2a3bbc0'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '22'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'df3ecdd80ef7402f98d3b2d83e348c9c'
                        key: {
                            category: 'x_507217_incdash_client_case'
                            prefix: 'CCS'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e1ca8f2b21f243a1beab8b61b5ab75b1'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'state'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ef0a04279a3c445f87b70cda6946c0b7'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_dow'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'f0782b55a6474e9993d87d0c187fd8dc'
                        key: {
                            name: 'x_507217_incdash_client_case'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f2bdd0ea3afc41fcafb07810281b6376'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f38306c8b24640d8bf5ea1c670c5fe74'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '03'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f537b21223dc410fb4c0eaf17b1eea8e'
                        key: {
                            sys_ui_section: {
                                id: '55ea548c1dfa43d28f873e92a4c7a11d'
                                key: {
                                    name: 'x_507217_incdash_client_case'
                                    caption: 'Client Case'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f80fddf057a44ee4aa97afa98aa0fc28'
                        key: {
                            name: 'x_507217_incdash_client_case'
                            element: 'pippo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f8bc3ac2f4b5432cb203d37307967774'
                        key: {
                            name: 'incident'
                            element: 'x_507217_incdash_open_hour'
                            value: '19'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                ]
            }
        }
    }
}
