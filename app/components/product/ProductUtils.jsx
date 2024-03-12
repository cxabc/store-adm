import React from 'react';
import ProductEdit from "./ProductEdit";
import {App, Utils} from "../../common";
import U from "../../common/U";
import {Tag} from 'antd';

let ProductUtils = (() => {
    let currentPageKey = 'key-product-pageno';
    let setCurrentPage = (pageno) => {
        Utils._setCurrentPage(currentPageKey, pageno);
    };

    let getCurrentPage = () => {
        return Utils._getCurrentPage(currentPageKey);
    };

    let edit = (product, loadData) => {
        Utils.common.renderReactDOM(<ProductEdit product={product} loadData={loadData}/>);
    };

    let loadSort = (compont) => {
        App.api('adm/sort/sorts').then((sort) => {
            compont.setState({sort});
        });
    };

    let renderCategoryTags = (sorts, sortId) => {

        if (!sorts || sorts.length === 0) {
            return null;
        }

        if (!sortId || sortId === 0) {
            return null;
        }

        let sequence = '';
        sorts.map((t1) => {
            if (t1.id === sortId) {
                sequence = t1.sequence;
            }
            t1.children.map((t2) => {
                if (t2.id === sortId) {
                    sequence = t2.sequence;
                }
                t2.children.map((t3) => {
                    if (t3.id === sortId) {
                        sequence = t3.sequence;
                    }
                })
            })
        });
        if (U.str.isEmpty(sequence)) {
            return null;
        }
        let ret = [];
        sorts.map((t1) => {
            if (t1.sequence.substr(0, 2) === sequence.substr(0, 2)) {
                ret.push(<Tag key={0} color="#f50">{t1.name}</Tag>);
                t1.children.map((t2) => {
                    if (t2.sequence.substr(0, 4) === sequence.substr(0, 4)) {
                        ret.push(<Tag key={1} color="#108ee9">{t2.name}</Tag>);
                        t2.children.map((t3) => {
                            if (t3.sequence === sequence) {
                                ret.push(<Tag key={2} color="green">{t3.name}</Tag>);
                            }
                        })
                    }
                })
            }
        });
        return ret;
    };

    return {
        edit, setCurrentPage, getCurrentPage, loadSort, renderCategoryTags
    }

})();

export default ProductUtils;