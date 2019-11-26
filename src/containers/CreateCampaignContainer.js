import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';

export const CreateCampaignContainer = (props) => {

    if(props.createCampaign) {
        return(<div>
        </div>);
    }
    else {
        return(<div>
        </div>);
    }
};

CreateCampaignContainer.propTypes = {
    createCampaign: PropTypes.bool.isRequired,
    createCampaignEventHandler: PropTypes.func.isRequired
};