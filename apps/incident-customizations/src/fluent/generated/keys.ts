import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    '162581e087133200b4ae6c5837cb0b1a': {
                        table: 'sys_script'
                        id: '162581e087133200b4ae6c5837cb0b1a'
                    }
                    '82d38a27f31403100c43346b62968c0d': {
                        table: 'sys_script'
                        id: '82d38a27f31403100c43346b62968c0d'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '9820494a97904193b2a4065194bc33ce'
                    }
                    'incident-resume-on-hold-global': {
                        table: 'sys_script'
                        id: '37aa6fc1c1194277973a5dbca2eb8862'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'b274b2902a44494cb7a940c2332c898a'
                    }
                    'src_server_business-rules_resume-on-hold_ts': {
                        table: 'sys_module'
                        id: '7783024010fc44b09ee04c4ca54a6b94'
                    }
                }
                composite: [
                    {
                        table: 'sys_es_latest_script'
                        id: '0a84b6e0763a4e058531c440fc3511cf'
                        key: {
                            id: '37aa6fc1c1194277973a5dbca2eb8862'
                            table: 'sys_script'
                        }
                    },
                    {
                        table: 'sys_es_latest_script'
                        id: '0af48e63f31403100c43346b62968cee'
                        key: {
                            id: '82d38a27f31403100c43346b62968c0d'
                            table: 'sys_script'
                        }
                    },
                    {
                        table: 'sys_claim'
                        id: '724b17c1831c5f10e40cf120feaad395'
                        key: {
                            claim_owner_scope: 'a0ecdc6a0e6f4f308816974af6644c56'
                            previous_claim_scope: 'a0ecdc6a0e6f4f308816974af6644c56'
                            metadata_update_name: 'sys_script_82d38a27f31403100c43346b62968c0d'
                        }
                    },
                    {
                        table: 'sys_claim'
                        id: 'b24b17c1831c5f10e40cf120feaad397'
                        key: {
                            claim_owner_scope: 'a0ecdc6a0e6f4f308816974af6644c56'
                            previous_claim_scope: 'com.snc.incident'
                            metadata_update_name: 'sys_script_82d38a27f31403100c43346b62968c0d'
                        }
                    },
                    {
                        table: 'sys_claim'
                        id: 'b64b17c1831c5f10e40cf120feaad3a2'
                        key: {
                            claim_owner_scope: 'a0ecdc6a0e6f4f308816974af6644c56'
                            previous_claim_scope: 'a0ecdc6a0e6f4f308816974af6644c56'
                            metadata_update_name: 'sys_script_162581e087133200b4ae6c5837cb0b1a'
                        }
                    },
                    {
                        table: 'sys_claim'
                        id: 'f24b17c1831c5f10e40cf120feaad3a3'
                        key: {
                            claim_owner_scope: 'a0ecdc6a0e6f4f308816974af6644c56'
                            previous_claim_scope: 'com.snc.best_practice.incident.k'
                            metadata_update_name: 'sys_script_162581e087133200b4ae6c5837cb0b1a'
                        }
                    },
                ]
            }
        }
    }
}
