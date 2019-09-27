import React from 'react';
import { DBCollectionStatus } from '../../../../lib/DB2';

import { AppConfig } from '@kbase/ui-components';
import LinkedData from './view';
import { TaxonReference } from '../../../../types/taxonomy';
import LinkedDataDB from './LinkedDataDB';

export interface Props {
    token: string;
    config: AppConfig;
    taxonRef: TaxonReference;
}

interface State { }

export default class Data extends React.Component<Props, State> {
    db: LinkedDataDB;
    constructor(props: Props) {
        super(props);
        this.db = new LinkedDataDB({
            onUpdate: () => {
                this.forceUpdate();
            },
            initialData: {
                linkedObjectsCollection: {
                    status: DBCollectionStatus.NONE
                }
            },
            token: props.token,
            config: props.config
        });
    }

    fetchLinkedObjects(page: number, pageSize: number) {
        return this.db.fetchLinkedObjects({ taxonRef: this.props.taxonRef, page, pageSize });
    }

    // renderNone() {
    //     return <Icon type="loading" />;
    // }

    // renderLoading() {
    //     return <Icon type="loading" />;
    // }

    // renderError(db: LinkedDataDBStateError) {
    //     return (
    //         <ErrorView error={db.error} />
    //     )
    // }

    // renderLoaded(db: LinkedDataDBStateLoaded) {
    //     return <LinkedData linkedObjects={db.linkedObjects} fetchLinkedObjects={this.fetchLinkedObjects.bind(this)} />;
    // }

    // componentDidMount() {
    //     const db = this.db.get();
    //     switch (db.status) {
    //         case DBStatus.NONE:
    //             this.db.fetchLinkedObjects({ taxonRef: this.props.taxonRef, page: 1, pageSize: 1000 });
    //     }
    // }

    // componentDidUpdate(prevProps: Props) {
    //     if (prevProps.taxonRef.id !== this.props.taxonRef.id ||
    //         prevProps.taxonRef.namespace !== this.props.taxonRef.namespace ||
    //         prevProps.taxonRef.timestamp !== this.props.taxonRef.timestamp) {

    //         this.db.fetchLinkedObjects({ taxonRef: this.props.taxonRef, page: 1, pageSize: 1000 });
    //     }
    // }

    render() {
        const db = this.db.get();
        return <LinkedData
            linkedObjectsCollection={db.linkedObjectsCollection}
            fetchLinkedObjects={this.fetchLinkedObjects.bind(this)} />;
        // this.renderLoaded(db);
        // switch (db.status) {
        //     case DBStatus.NONE:
        //         // this.db.fetchLinkedObjects({ taxonRef: this.props.taxonRef, page: 1, pageSize: 1000 });
        //         return this.renderNone();
        //     case DBStatus.LOADING:
        //         return this.renderLoading();
        //     case DBStatus.ERROR:
        //         return this.renderError(db);
        //     case DBStatus.LOADED:
        //         return this.renderLoaded(db);
        // }
    }
}